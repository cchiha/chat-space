FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/29533006.gif")
    user
    group
  end
end
