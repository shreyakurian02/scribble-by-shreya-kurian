# frozen_string_literal: true

module Validators
  class RedirectionValidator < ActiveModel::Validator
    def validate(record)
      to_path_is_not_same_as_from_path(record)
      cyclic_redirection(record)
      chained_redirection(record)
    end

    private

      def to_path_is_not_same_as_from_path(record)
        return unless record.from_path == shortened_to_path(record.to_path)

        record.errors.add(:to_path, I18n.t("errors.same_path"))
        throw :abort
      end

      def cyclic_redirection(record)
        return unless cyclic_redirection_exists?(record)

        record.errors.add(:to_path, I18n.t("errors.loop"))
        throw :abort
      end

      def chained_redirection(record)
        return if cyclic_redirection_exists?(record)

        from_path_same_as_to_path_of_another_redirection(record)
        to_path_same_as_from_path_of_another_redirection(record)
      end

      def cyclic_redirection_exists?(record)
        redirections_with_to_path_same_as_from_path_of_another_redirection(record)
          .where(from_path: shortened_to_path(record.to_path)).present?
      end

      def from_path_same_as_to_path_of_another_redirection(record)
        return unless record.site.redirections.exists?(from_path: shortened_to_path(record.to_path))

        record.errors.add(:to_path, I18n.t("errors.chain_path", path: "from"))
      end

      def to_path_same_as_from_path_of_another_redirection(record)
        return unless redirections_with_to_path_same_as_from_path_of_another_redirection(record).present?

        record.errors.add(:from_path, I18n.t("errors.chain_path", path: "to"))
      end

      def shortened_to_path(to_path)
        host, path = parsed_to_path_url(to_path).values
        [app_host, "127.0.0.1"].include?(host) ? path : to_path
      end

      def app_host
        URI.parse(Rails.application.secrets[:host]).host
      end

      def parsed_to_path_url(url)
        parsed_url = URI.parse(url)
        { host: parsed_url.host, path: parsed_url.path }
      end

      def redirections_with_to_path_same_as_from_path_of_another_redirection(record)
        from_path_with_dev_host = "http://127.0.0.1:3000#{record.from_path}"
        from_path_with_host = "#{Rails.application.secrets[:host]}#{record.from_path}"

        record.site.redirections.where(
          "to_path = :from_path_with_host OR
           to_path = :from_path OR
           to_path = :from_path_with_dev_host",
          from_path_with_host:, from_path_with_dev_host:, from_path: record.from_path
        )
      end
  end
end
