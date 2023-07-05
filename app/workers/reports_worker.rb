# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker

  def perform(user_id)
    broadcast_progress(pubsub_token: user_id, message: I18n.t("report.generate"), progress: 25)
    current_user = User.find(user_id)
    articles = current_user.articles.published.order(views: :desc)
    content = ApplicationController.render(assigns: { articles: }, layout: "pdf", template: template_path)
    broadcast_progress(pubsub_token: user_id, message: I18n.t("report.generate"), progress: 50)
    pdf_report = WickedPdf.new.pdf_from_string content
    broadcast_progress(pubsub_token: user_id, message: I18n.t("report.upload"), progress: 75)
    upload_report(current_user, pdf_report)
    broadcast_progress(pubsub_token: user_id, message: I18n.t("report.attach"), progress: 100)
  end

  private

    def broadcast_progress(pubsub_token:, message:, progress: 0)
      ActionCable.server.broadcast(pubsub_token, { message:, progress: })
    end

    def template_path
      "api/v1/articles/report/download"
    end

    def upload_report(current_user, pdf_report)
      current_user.report.purge_later if current_user.report.attached?
      current_user.report.attach(io: StringIO.new(pdf_report), filename: "report.pdf", content_type: "application/pdf")
      current_user.save
    end
end
