Fetch Rewards Point Transaction API

Fetch users users have points in their accounts and users only see a single point balance in their accounts. But for reporting purposes Fetch actually tracks their points per payer/partner (such as Dannon or Miller Coors). In the Fetch system, each transaction record contains: payer (string), points (integer), timestamp (date). For earning points it is easy to assign a payer, Fetch knows which actions earned the points. And thus which partner should be paying for the points. When a user spends points, they don't know or care which payer the points come from. But, the Fetch accounting team does care how the points are spent. There are two rules for determining what points to "spend" first: points cannot be negative and oldest points should be spent first (oldest based on transaction timestamp, not the order they’re received)

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

_Create new transaction. User must include { payer, points }_
Returns new transaction with {payer,points, timestamp}\_
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
{ "DANNON": 200, "CHEESE R' US": 0, "MILLER COORS": 1000 }
```

---

    POST /spend { points } => { transaction }

_Spend points in order of oldest to newest. Send {points: integer } Returns error if points is not a valid number, missing, or if user does not have enough points. Returns record of points used by payer_
Example Return (after user used 1000 points)

```json
{
  "UNILEVER": -200,
  "DANNON": -800
}
```
