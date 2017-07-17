# Cardline_Backend

* 2017 선린 모바일 콘텐츠 경진대회 "Cardline" 프로젝트의 Backend API를 명시한 문서입니다.

* 모든 요청은 귀찮으니 POST, FormUrlEncoded로 처리하겠습니다.

# Contributor
* UI/UX Designer [Luminon](https://github.com/Luminon)
* Android Client Developer [Junseok Oh](https://github.com/kotohana5706)
* Android Client Developer [Connotation](https://github.com/kkarrkid7)
* Server Backend Developer [Seongwoon Cho](https://github.com/SunSet0418)
* Server Backend Developer [Yeonjun Kim](https://github.com/iwin2471)

## Database Schema

> UserSchema

    _id : String

<!-- 형식에 맞춰 추가해주세요. -->

## API Document

### Auth

> /auth/facebook/token : Facebook Token Authentication
>> Requiring Params

    access_token : Facebook Token

>> Return Values

    >>> On Success

        HTTP 200, User Schema

    >>> On Failure

        HTTP 401

> /auth/local/register : Local Database Sign up
>> Requiring Params

    email : String (User's Email)
    name : String (User's Name)
    password : String (User's password)

>> Return Values

    >>> On Success

        HTTP 200: Return Nothing

    >>> On Failure

        Server Error : HTTP 403

        Duplicated Schema : HTTP 409

> /auth/local/authenticate : Local Database Auto Authenticate
>> Requiring Params

    token : Auth Token

>> Return Values

    >>> On Success

        HTTP 200: Return User Schema

    >>> On Failure

        HTTP 401

> /auth/local/login : Local Database Login
>> Requiring Params

    email : User Email
    password : User Password

>> Returning Values

    >>> On Success

        HTTP 200: Return User Schema

    >>> On Failure

        DB Error : HTTP 403

        Unvaild User Info : HTTP 401

        Password Error : HTTP 401

### Newsfeed

> /feed/recommend : Get Recommended Newsfeed based on User's Interest
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Card>

    >>> On Failure

        No User Found : HTTP 404

> /feed/type : Get Newsfeed on Selected Type
>> Requiring Params

    type : Number

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Card>

    >>> On Failure

        No User Found : HTTP 404

> /feed/search : Search from <Title, Editor Name, Tag>
>> Requiring Params

    query : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Json
```
    // Json Example
    {
        title : [
            { Card Schema },
            { Card Schema },
            { Card Schema },
            { Card Schema },
            { Card Schema }
       
        editor : [
            { User Schema },
            { User Schema },
            { User Schema },
            { User Schema },
            { User Schema }
        ]
    }
```

    >>> On Failure

        No User Found : HTTP 404

### Self

> /self/info : Get Self Info
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return User Schema (유저 정보, 인기글, 해당 유저의 게시글 전부를 포함하여야 함 )

    >>> On Failure

        No User Found : HTTP 404

> /self/info/card : Get Self Card List
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Card>

    >>> On Failure

        No User Found : HTTP 404

> /self/info/update : Change Self Info
>> Requiring Params

    token : String
    name : String
    profile : String (소개글)

>> Returning Values

    >>> On Success

        HTTP 200: Return User Schema (유저 정보, 인기글, 해당 유저의 게시글 전부를 포함하여야 함 )

    >>> On Failure

        No User Found : HTTP 404

> /self/info/update/photo : Change Self Photo
>> Requiring Params

    token : String
    photo : File

>> Returning Values

    >>> On Success

        HTTP 200: Return Nothing

    >>> On Failure

        No User Found : HTTP 404

> /self/info/update/like : Change Likes
>> Requiring Params

    token : String
    likes : Array<Integer>

>> Returning Values

    >>> On Success

        HTTP 200: Return User

    >>> On Failure

        No User Found : HTTP 404

> /self/notification : Get Notification List
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Notification> (노티피케이션에는 글에 대한 정보가 들어가야 하는에 이건 클라이언트 개발자랑 상의)

    >>> On Failure

        No User Found : HTTP 404

> /self/favorite : Get Favorite Card List
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Card>

    >>> On Failure

        No User Found : HTTP 404

> /self/history : Get Card View History
>> Requiring Params

    token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Card>

    >>> On Failure

        No User Found : HTTP 404

### Card

> /card/info : Get Card Info
>> Requiring Params

    card_token : String
    token : String (유저 탐색 기록에 해당 카드를 저장시켜야 함)

>> Returning Values

    >>> On Success

        HTTP 200: Return Card

    >>> On Failure

        No Card Found : HTTP 404

> /card/info/comment : Get Card Comment
>> Requiring Params

    card_token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return Array<Comment>

    >>> On Failure

        No Card Found : HTTP 404

> /card/like : Like Card
>> Requiring Params

    token : String
    card_token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return nothing

    >>> On Failure

        No User Found : HTTP 404

> /card/dislike : DisLike Card
>> Requiring Params

    token : String
    card_token : String

>> Returning Values

    >>> On Success

        HTTP 200: Return nothing

    >>> On Failure

        No User Found : HTTP 404

> /card/post : Post Card
>> Requiring Params

    <민석이랑 상의>

>> Returning Values

    >>> On Success

        HTTP 200: Return Card

    >>> On Failure

        No Card Found : HTTP 404

> /card/post/uploadImage : Upload Card Image
>> Requiring Params

    <민석이랑 상의>

>> Returning Values

    >>> On Success

        HTTP 200: Return Nothing

    >>> On Failure

        No Card Found : HTTP 404

> /card/post/edit : Edit Card Image
>> Requiring Params

    <민석이랑 상의>

>> Returning Values

    >>> On Success

        HTTP 200: Return Card

    >>> On Failure

        No Card Found : HTTP 404

### User

> /user/info : Get Editor Info
>> Requiring Params

    email : String

>> Returning Values

    >>> On Success

        HTTP 200: Return User Schema (유저 정보, 인기글, 해당 유저의 게시글 전부를 포함하여야 함.  )

    >>> On Failure

        No User Found : HTTP 404
        
        
### Schema
    
>User Schema
    
    email: {type: String},
    passwd: {type: String},
    name: {type: String},
    token: {type: String},
    profile: {type: String},
    profile_img: {type: String},
    img_name : {type:String},
    facebook_id: {type: String},
    liked: [Number],
    favorite : [String],
    view_log : [String],
    search_log: [String],
    alert: [{
        title: {type: String},
        summary: {type: String}
    }]
    
>Card Schema

    category : {type: String},
    token : {type: String},
    card_token: {type: String},
    title: {type: String},
    writer: {type: String},
    subtitle: {type: String},
    like: {type: Number},
    date: {type: String}
    
>Comment Schema

    card_token: {type: String},
    writer_profile: {type: String},
    writer: {type: String},
    date: {type: String},
    summary: {type: String},
    
        
      
      
### 비 구현 API 



> /user/info

> /card/post

> /card/post/uploadimage

> /card/post/edit

> /self/info

> /self/info/update

> /self/info/card

> /feed/search