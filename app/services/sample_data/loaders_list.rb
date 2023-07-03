# frozen_string_literal: true

module SampleData
  module LoadersList
    def loaders_list
      @_loaders_list ||= [
        SampleData::DatabaseCleanupService,
        SampleData::SiteService,
        SampleData::UserService,
        SampleData::CategoryService,
        SampleData::ArticleService,
      ]
    end
  end
end
