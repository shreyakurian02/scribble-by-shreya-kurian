# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_should_not_be_saved_without_from_path
    @redirection.from_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_redirection_should_not_be_saved_without_to_path
    @redirection.to_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path can't be blank"
  end

  def test_redirection_count_increases_on_saving
    assert_difference "Redirection.count" do
      create :redirection
    end
  end

  def test_from_path_is_unique_for_a_site
    duplicate_redirection = @redirection.dup
    assert_not duplicate_redirection.valid?
    assert_includes duplicate_redirection.errors.full_messages, "From path has already been taken"

    duplicate_redirection.site_id = create(:site).id
    assert duplicate_redirection.valid?
  end

  def test_from_and_to_path_cannot_be_same_with_same_host
    path = "/about"
    redirection = build(:redirection, from_path: path, to_path: path)
    assert_not redirection.valid?
    assert_includes redirection.errors.full_messages, "To path #{I18n.t("errors.same_path")}"

    redirection = build(:redirection, from_path: path, to_path: "https://#{Rails.application.secrets[:host]}#{path}")
    assert_not redirection.valid?
    assert_includes redirection.errors.full_messages, "To path #{I18n.t("errors.same_path")}"
  end

  def test_redirection_shouldnt_form_cyclic_path
    first_redirection = create(:redirection, from_path: "/article", to_path: "/article-1")
    second_redirection = build(:redirection, from_path: "/article-1", to_path: "/article", site: first_redirection.site)
    assert_not second_redirection.valid?
    assert_includes second_redirection.errors.full_messages, "To path #{I18n.t("errors.loop")}"
  end

  def test_to_path_shouldnt_be_same_as_from_path_of_another_redirection
    new_redirection = build(:redirection, from_path: @redirection.to_path, site: @redirection.site)
    assert_not new_redirection.valid?
    assert_includes new_redirection.errors.full_messages, "From path #{I18n.t("errors.chain_path", path: "to")}"
  end

  def test_from_path_shouldnt_be_same_as_to_path_of_another_redirection
    new_redirection = build(:redirection, to_path: @redirection.from_path, site: @redirection.site)
    assert_not new_redirection.valid?
    assert_includes new_redirection.errors.full_messages, "To path #{I18n.t("errors.chain_path", path: "from")}"
  end

  def test_from_and_to_path_can_be_same_with_different_host
    redirection = build(:redirection, from_path: "/about", to_path: "https://sample.com/about")
    assert redirection.valid?
  end

  def test_redirection_shouldnt_be_saved_with_invalid_from_path
    invalid_paths = ["invalid-path", "https://invalid-path.com"]

    invalid_paths.each do |path|
      redirection = build :redirection, from_path: "invalid-path"
      assert_not redirection.valid?
      assert_includes redirection.errors.full_messages, "From path is invalid"
    end
  end

  def test_redirection_should_be_saved_with_valid_from_path
    redirection = build :redirection, from_path: "/settings"
    assert redirection.valid?
  end

  def test_redirection_shouldnt_be_saved_with_invalid_to_path
    invalid_paths = ["invalid-path", "https://invalid-path", "https//google.com"]

    invalid_paths.each do |path|
      redirection = build :redirection, to_path: "invalid-path"
      assert_not redirection.valid?
      assert_includes redirection.errors.full_messages, "To path is invalid"
    end
  end

  def test_redirection_should_be_saved_with_valid_to_path
    valid_paths = ["/settings", "http://google.com"]

    valid_paths.each do |path|
      redirection = build :redirection, to_path: "/settings"
      assert redirection.valid?
    end
  end
end
