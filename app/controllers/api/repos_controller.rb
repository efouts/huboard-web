module Api
  class ReposController < ApplicationController
    def show
      render json: { data: huboard.repo(params[:user], params[:repo]).fetch }
    end
    def details
      render json: { data: huboard.repo(params[:user], params[:repo]).details }
    rescue
      render json: { errors: [{status: "422", title: "Failed to load repository details"}]}, status: 422
    end
  end
end
