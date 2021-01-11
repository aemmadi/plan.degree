# Backend Server for Plan.Degree

## Course Schema

```js
{
  _id: ObjectId(), // unique id from mongodb
  subj: "CS",
  num: 3305,
  level: 3,
  desc: "Description of the course",
  title: "Discrete Math II"
  course: "CS 3305",
  pre_req: [{tags: ["CS 2305", "CE 2305"]}, {tags: ["MATH 2414", "MATH 2419"]}],
  co_req: [],
  req_text: "Prerequisites: (CE 2305 or CS 2305) with a grade of C or better, and (MATH 2414 or MATH 2419)"
  family: ["Computer Science"],
  credits: 3,
  required: true,
  special: false, // upper (junior standing)
  core: false // 040, 060, 080, etc
}
```
