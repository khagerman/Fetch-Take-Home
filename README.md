Fetch Rewards Point Transaction API

## To run this code locally:

-Clone repository or download above

-You will need **Node** and **npm** before starting, download both [here](https://nodejs.org/en/download/ "here")

-Install dependencies by running `npm install` or `npm i` (if you are feeling fancy)

-Start the server by running `npm start`, it should be running on `localhost:3000`
-You can run routes using **insomnia** on your computer, download it [here](https://insomnia.rest/download)

## Routes

## **/transactions**

    GET / => {transactions}

_Get list of all transactions. It should return an array of transactions._
Example Return:

```json
[
  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
  { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
  {
    "payer": "MILLER COORS",
    "points": 10000,
    "timestamp": "2020-11-01T14:00:00Z"
  },
  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
]
```

---

    POST / { payer, points } => { transaction }

_Create new transaction. User must include { payer, points }\
 Returns new transaction with {payer,points, timestamp}_
Example return:

```json
{
  "payer": "DANNON",
  "points": 200,
  "timestamp": "2022-05-14T22:16:03.460Z"
}
```

---

    GET /total => {transactionsTotal}

_Get list of all total points per payer. It should return an array of payers with their points. Does not return negative values_
Example Return:

```json
`{"DANNON":200,
 "CHEESE R' US": 0,
 "MILLER COORS":1000
 }`
```

---

    POST /spend { points } => { transaction }

_Spend points. Send {points: integer } Returns error if points is not a valid number or missing. Returns record of points used by payer_
Example Return:

```json
`{
	"UNILEVER": -200,
	"DANNON": -800
}`
```
