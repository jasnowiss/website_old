require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  
  def setup
    @base_title = "Jeffrey Snowiss"
  end

  test "should get home" do
    get :home
    assert_response :success
    # assert_select "title", "#{@base_title} | Home"
  end

  test "should get help" do
    get :help
    assert_response :success
  end

end
