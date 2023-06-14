# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_user_should_not_valid_without_first_name
    @user.first_name = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_user_should_not_valid_without_email
    @user.email = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_user_should_not_be_valid_with_invalid_email
    invalid_emails = ["invalid format", "oliver@gmail", "oliver.gmail"]
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
      assert_includes @user.errors.full_messages, "Email is invalid"
    end
  end

  def test_user_should_not_be_valid_with_duplicate_email
    new_user = build :user, email: @user.email
    assert new_user.invalid?

    new_user = build :user, email: @user.email.upcase
    assert new_user.invalid?
    assert_includes new_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_is_saved_in_lower_case
    uppercase_email = "OLIVER@EXAMPLE.COM"
    @user.update!(email: uppercase_email)
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_name_returns_concatenated_first_and_last_name
    assert_equal @user.name, [@user.first_name, @user.last_name].join(" ").strip
  end
end
