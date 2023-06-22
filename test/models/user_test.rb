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

  def test_shouldnt_save_user_with_duplicate_email_within_same_site
    existing_email = @user.email
    invalid_emails = [existing_email, existing_email.downcase, existing_email.upcase]

    invalid_emails.each do |email|
      new_user = build(:user, site: @user.site, email:)
      assert new_user.invalid?
      assert_includes new_user.errors.full_messages, "Email has already been taken"
    end
  end

  def test_users_can_have_duplicate_email_in_different_sites
    new_site = create :site
    existing_email = @user.email
    duplicate_emails = [existing_email, existing_email.downcase, existing_email.upcase]

    duplicate_emails.each do |email|
      new_user = build(:user, site: new_site, email:)
      assert new_user.valid?
    end
  end

  def test_name_returns_concatenated_first_and_last_name
    assert_equal @user.name, [@user.first_name, @user.last_name].join(" ").strip
  end

  def test_users_shouldnt_be_saved_without_site
    @user.site_id = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Site must exist"
  end

  def test_articles_are_destroyed_when_user_is_deleted
    article = create :article, user: @user
    @user.destroy!
    assert_not Article.exists?(article.id)
  end
end
