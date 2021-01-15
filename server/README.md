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

## Degree Schema

```js
{
    "ecs": {
        "cs": {
            name: Computer Science,
            path: {
                core: {
                    010: {
                        courses: [
                            {1: "RHET 1302"},
                            {1: "ECS 3390"}
                        ]
                    },
                    020: {
                        courses: [
                            {1: ["MATH 2413", "MATH 2417"]}
                        ]
                    },
                    030: {
                        courses: [
                            {1: "PHYS 2325"},
                            {1: "PHYS 2326"}
                        ]
                    },
                    040: {
                        courses: [
                            {3: ["040"]}
                        ]
                    },
                     050: {
                        courses: [
                            {3: ["050"]}
                        ]
                    },
                     060: {
                        courses: [
                            {6: ["060"]}
                        ]
                    },
                     070: {
                        courses: [
                            {1: "GOVT 2305"},
                            {1: "GOVT 2306"}
                        ]
                    },
                    080: {
                        courses: [
                            {3: ["080"]}
                        ]
                    }
                    090: {
                        courses: [
                            {1: ["MATH 2413", "MATH 2417"]},
                            {1: "MATH 2419"},
                            {1: "PHYS 2125"}
                        ]
                    }
                },
                major: {
                    prep: {
                        courses: [
                            {1: "ECS 1100"},
                            {1: "CS 1200"},
                            {1: "CS 1136"},
                            {1: "CS 1336"},
                            {1: "CS 1337"},
                            {1: "CS 2305"},
                            {1: "CS 2336"},
                            {1: "CS 2340"},
                            {1: ["MATH 2414", "MATH 2419"]},
                            {1: "MATH 2418"},
                            {1: "PHYS 2125"},
                            {1: "PHYS 2126"},
                            {1: "PHYS 2325"},
                            {1: "PHYS 2326"}
                        ]
                    },
                    core: {
                        courses: [
                            {1: "CS 3162"},
                            {1: "CS 3305"},
                            {1: "CS 3341"},
                            {1: "CS 3345"},
                            {1: "CS 3354"},
                            {1: "CS 3377"},
                            {1: "ECS 3390"},
                            {1: "CS 4141"},
                            {1: "CS 4337"},
                            {1: "CS 4341"},
                            {1: "CS 4347"},
                            {1: "CS 4348"},
                            {1: "CS 4349"},
                            {1: "CS 4384"},
                            {1: "CS 4485"}
                        ]
                    },
                    guided: {
                        courses: [
                            {1: "CS 4314"},
                            {1: "CS 4315"},
                            {1: "CS 4334"},
                            {1: "CS 4336"},
                            {1: "CS 4352"},
                            {1: "CS 4353"},
                            {1: "CS 4361"},
                            {1: "CS 4365"},
                            {1: "CS 4375"},
                            {1: "CS 4376"},
                            {1: "CS 4386"},
                            {1: "CS 4389"},
                            {1: "CS 4390"},
                            {1: "CS 4391"},
                            {1: "CS 4392"},
                            {1: "CS 4393"},
                            {1: "CS 4394"},
                            {1: "CS 4395"},
                            {1: "CS 4396"},
                            {1: "CS 4397"},
                            {1: "CS 4398"},
                            {1: "CS 4399"},
                            {1: "EE 4325"},
                            {1: "SE 4351"},
                            {1: "SE 4352"},
                            {1: "SE 4367"},
                            {1: "SE 4381"}
                        ]
                    },
                    elective: {
                        courses: []
                    }
                }
            },
            credits: {
                degree: 124,
                core: 42,
                major: {
                    prep: 24,
                    core: 39,
                    guided: 9,
                    total: 72
                },
                elective: 10
            }
        }
    }
}
```
