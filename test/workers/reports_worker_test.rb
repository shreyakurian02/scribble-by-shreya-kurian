# frozen_string_literal: true

require "test_helper"

class ReportsWorkerTest < ActiveSupport::TestCase
  include ActionCable::TestHelper

  def setup
    Sidekiq::Testing.inline!
    @user = create :user
  end

  def test_will_generate_and_attach_report_to_user
    ReportsWorker.perform_async(@user.id)
    assert @user.report.attached?
    assert_broadcasts @user.id, 4
  end
end
