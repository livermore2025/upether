# 2020 02 20 시퀄라이즈에 대해 공부해보자

### codestates에서 과제로 살짝 본 것으로는 부족하다고 느꼈다.
### 자세히 알아보려고 작성한다.


## 먼저 작성한 db 구조이다.
![db이미지](./db.PNG)

# 1. schema 구조대로 시퀄라이즈에서의 models 구현
- [models 구성 방법](https://sequelize.org/v7/manual/model-basics.html)
  - [model 확장 래핑해서 써보기](https://jeonghwan-kim.github.io/dev/2020/07/06/sequelize-model.html)
- [데이터 타입](https://sequelize.org/v7/manual/model-basics.html#data-types)
- [일반 쿼리 사용법](https://sequelize.org/v7/manual/model-querying-basics.html)
- [row 쿼리 사용법](https://sequelize.org/v7/manual/raw-queries.html)
- [model 끼리의 관계 작성](https://sequelize.org/v7/manual/assocs.html)
- [컬럼 삭제 시간 이란](https://sequelize.org/v7/manual/paranoid.html)
- [validation 작성법](https://sequelize.org/v7/manual/validations-and-constraints.html)

일단 기본적으로 필요하다고 생각되는 페이지이다.

models 구성 먼저 보겠다.
sequelize 에서의 model은 db의 스케마 구조에 해당한다.
model 정의 부분은 일반형과 확장형 두 종류로 나누어져있다.

```javascript
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
```

```javascript
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {
    otherPublicField;
}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
```

코드를 보면 sequelize 메소드를 통해 바로 정의하는법이 있고, User라는 model을 만들어 sequelize에 연결하는 방법으로 나누어져 있다.

두번째 방법을 확장형으로 소개한 이유는 `otherPublicField`가 써진 부분에 다른 필드를 추가할 수 있다.

클래스로 정의한 뒤 클래스 외부에서 스키마를 사용하는데 이 부분을 다르게 랩핑하여 사용한 자료가 있었다.

```javascript
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
class User extends Model {
  // 초기화하는 정적 메소드
  static initialize(sequelize, DataTypes) {
    // 클래스 외부에서 호출했던 init() 메소드를 클래스 안으로 옮겼다
    super.init(
      {
        firstName: {
          DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          DataTypes.STRING
      },
      },
      { sequelize, modelName: 'User'}
    )
  }
}
```


https://velog.io/@sunhwa508/sequelize-%EC%8B%9C%ED%80%84%EB%9D%BC%EC%9D%B4%EC%A6%88-%EB%AA%A8%EB%8D%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0


https://sequelize.org/master/manual/migrations.html


https://sequelize.org/v7/manual/dialect-specific-things.html

https://sequelize.org/v6/manual/assocs.html



# model
## standard associations: One-To-One, One-To-Many and Many-To-Many.

-  The HasOne association
-  The BelongsTo association
-  The HasMany association
-  The BelongsToMany association

## | Easy start
```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);
// one to one association
A.hasOne(B); // A 는 B를 하나만 가질 수 있다.
B.belongsTo(A); // B 는 A에 속한다.

// One-To-Many association
A.hasMany(B); // A는 여러개의 B를 가질 수 있다.
B.belongsTo(A) // B는 A에 속한다.

// many to many association
A.belongsToMany(B, { through: 'C' }); // A는 많은 B 에 속한다.
B.belongsToMany(A, { through: 'C' }); // B는 많은 A 에 속한다.
```


--- 
## one to one
```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);
A.hasOne(B, {
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});
B.belongsTo(A);
```
가능한 선택은 `RESTRICT`, `CASCADE`,`NO ACTION`,`SET DEFAULT`,`SET NULL` 이다.

1:1 연결의 기본값은 에 `onDelete`는 `SET NULL`이며  `onUpdate` 는 `CASCADE` 이다.

---
## one to many

```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);
// One-To-Many association
A.hasMany(B, {
  foreignKey: 'A_PK_id'
});
B.belongsTo(A);
```
1:1 관계와 마찬가지로 `onDelete` 기본값은 `SET NULL`이고 `onUpdate` 기본값은 `CASCADE` 이다.

---

## many to many
```javascript
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);
// many to many association
A.belongsToMany(B, { through: 'C' }); // A는 많은 B 에 속한다.
B.belongsToMany(A, { through: 'C' }); // B는 많은 A 에 속한다.
```

N:M관계에서 `onUpdate`, `onDelete` 둘 모두 `CASCADE`가 기본값이다.

Belongs-To-Many는 모델을 통해 고유한 키를 생성합니다. 이 고유 키 이름은 uniqueKey 옵션을 사용하여 재정의할 수 있습니다. 이 고유 키 생성을 방지하려면 unique: false 옵션을 사용하십시오.
```javascript
Project.belongsToMany(User, { through: UserProjects, uniqueKey: 'my_custom_unique' })
```

## primary key 가 아닌경우 [targetKey,sourceKey 옵션](https://sequelize.org/v7/manual/assocs.html#creating-associations-referencing-a-field-which-is-not-the-primary-key)을 찾아보자

---

# [`CRUD`](https://sequelize.org/v7/manual/model-querying-basics.html#simple-insert-queries)
## CREATE
```javascript
// 간단한 예시
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);

// fields 배열에 값을 정해줘서 특정 값만 입력해 생성
const user = await User.create({
  username: 'alice123',
  isAdmin: true
}, { fields: ['username'] });
// let's assume the default of isAdmin is false
console.log(user.username); // 'alice123'
console.log(user.isAdmin); // false
```
## READ
```javascript
// Find all users
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
```
```SQL
SELECT * FROM ...
```
### | 속성 바꾸기 (AS)
```javascript
// before
Model.findAll({
  attributes: ['foo', 'bar']
});
```
```SQL
SELECT foo, bar FROM ...
```
```javascript
// after
Model.findAll({
  attributes: ['foo', ['bar', 'baz'], 'qux']
});
```
```SQL
SELECT foo, bar AS baz, qux FROM ...
```

### | count 집계
```javascript
Model.findAll({
  attributes: [
    'foo',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
    'bar'
  ]
});
```
```SQL
SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
```
- 주의할 점
```javascript
  // This is a tiresome way of getting the number of hats (along with every column)
Model.findAll({
  attributes: [
    'id', 'foo', 'bar', 'baz', 'qux', 'hats', // We had to list all attributes...
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'] // To add the aggregation...
  ]
});

// This is shorter, and less error prone because it still works if you add / remove attributes from your model later
Model.findAll({
  attributes: {
    include: [
      [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
    ]
  }
});
```
```SQL
SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM ...
```

비슷하게 반대로 전체에서 특정 속성을 빼는것도 가능하다.
```javascript
Model.findAll({
  attributes: { exclude: ['baz'] }
});
-- Assuming all columns are 'id', 'foo', 'bar', 'baz' and 'qux'
```
```SQL
SELECT id, foo, bar, qux FROM ...
```


```javascript
Post.findAll({
  where: {
    authorId: 2
  }
});
```
```SQL
SELECT * FROM post WHERE authorId = 2;
```

## update
```javascript
// Change everyone without a last name to "Doe"
await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
});
```

## delete
```javascript
// Delete everyone named "Jane"
await User.destroy({
  where: {
    firstName: "Jane"
  }
});

// Truncate the table
await User.destroy({
  truncate: true
});
```


# eager-loading 이란?
https://sequelize.org/v7/manual/eager-loading.html

https://sequelize.org/v7/manual/model-querying-basics.html#simple-insert-queries
