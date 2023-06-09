# frozen_string_literal: true

module LoadSite
  extend ActiveSupport::Concern

  private

    def load_site
      return if (@site = Site.first.presence)

      render_error(t("not_found", entity: "Site"), :not_found)
    end
end
