# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  def setup
    @site = create :site
  end

  def test_site_should_not_be_valid_without_title
    @site.title = ""
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Title can't be blank"
  end

  def test_site_should_not_be_vald_with_duplicate_title
    @site.save!
    new_site = @site.dup
    assert_not new_site.valid?
    assert_includes new_site.errors.full_messages, "Title has already been taken"
  end

  def test_site_should_not_be_valid_with_invalid_title_format
    @site.title = "*****"
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Title should have atleast one alphanumeric character"
  end

  def test_title_sit_should_be_be_saved_with_valid_title_format
    @site.title = "****a"
    assert @site.valid?
  end

  def test_password_shouldnt_be_saved_with_invalid_length
    @site.password = "a" * (Site::MINIMUM_PASSWORD_LENGTH - 1)
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Password is too short (minimum is #{Site::MINIMUM_PASSWORD_LENGTH} characters)"
  end

  def test_password_shouldnt_be_saved_with_invalid_format
    passwords = ["aaaaaa", "111111"]

    passwords.each do |password|
      @site.password = password
      assert_not @site.valid?
      assert_includes @site.errors.full_messages, "Password is invalid"
    end
  end

  def test_valid_password_is_saved
    @site.password = "a" * (Site::MINIMUM_PASSWORD_LENGTH) + "2"
    assert @site.valid?
  end

  def test_password_protected_returns_if_site_is_password_protected
    assert @site.password_protected?
    @site.update!(password: nil)
    assert_not @site.reload.password_protected?
  end

  def test_authentication_token_regenerates_when_password_is_updated
    old_authentication_token = @site.authentication_token
    @site.update!(password: "new_password@2")
    assert_not_equal old_authentication_token, @site.reload.authentication_token
  end

  def test_site_incinerates_successfully
    category = create :category, site: @site
    redirection = create :redirection, site: @site
    user = create :user, site: @site
    article = create(:article, category:, user:)

    @site.destroy!
    assert_not Article.exists?(article.id)
    assert_not Category.exists?(category.id)
    assert_not Redirection.exists?(category.id)
    assert_not User.exists?(category.id)
  end
end
