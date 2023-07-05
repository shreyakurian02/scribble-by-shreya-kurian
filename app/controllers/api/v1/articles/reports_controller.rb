# frozen_string_literal: true

class Api::V1::Articles::ReportsController < ApplicationController
  def create
    ReportsWorker.perform_async(current_user.id)
  end

  def download
    return render_error(t("not_found", entity: "report"), :not_found) unless current_user.report.attached?

    send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def pdf_file_name
      "articles-report.pdf"
    end
end
