class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  
  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      set_flash_message(:notice, :success, :kind => "Facebook")
      sign_in_and_redirect @user
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      set_flash_message(:notice, :alert, :kind => "Could not sign in with Facebook")
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end