import express, { Request, Response, NextFunction } from "express";
import db from "./database/db";
import routes from "./routes";

const app = express();
const port = process.env.NODE_PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.json({
    status: "failed",
    data: { message: err.message },
  });
});

app.listen(port, () => {
  console.log("listening at port 3030");
  // db.migrate
  //   .latest()
  //   .then(() => {
  //     console.log("migrate latest");
  //   })
  //   .catch((e: any) => console.error(e));
});
