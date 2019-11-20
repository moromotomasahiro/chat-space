## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

 ##usersテーブル

  |Column|Type|Options|
  |------|----|-------|
  |email|string|null: false|
  |password|string|null: false|
  |nickname|string|null: false|

### Association
- has_many :group
- has_many :messages

 ##messagesテーブル
  |Column|Type|Options|
  |------|----|-------|
  |image|text||
  |text|text||
  |user_id|integer|null: false, foreign_key: true|
### Association
  - belongs_to :user
  - has_many :messages


##groupsテーブル
  |Column|Type|Options|
  |------|----|-------|
  |group_name|string|null: false|
  |user_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users