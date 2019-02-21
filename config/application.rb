require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Mywebsite
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    # Add a trailing slash to routes.
    # config.action_controller.default_url_options = { :trailing_slash => true }
    # Using Bootstrap Font Awesome
    # config.assets.paths << Rails.root.join("app", "assets", "fonts")
    # Using EaselJS
    # config.assets.paths << Rails.root.join("app", "assets", "easeljs", "_assets")
    # config.assets.paths << Rails.root.join("vendor", "assets", "easeljs", "_assets", "css")
    # config.assets.paths << Rails.root.join("vendor", "assets", "easeljs", "_assets", "js")
    # config.assets.paths << Rails.root.join("vendor", "assets", "easeljs", "_assets", "libs")
    # config.assets.paths << Rails.root.join("vendor", "assets", "easeljs", "lib")
  end
end
