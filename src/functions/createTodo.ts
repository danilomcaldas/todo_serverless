import { APIGatewayProxyHandler } from "aws-lambda";
import { ICreateTodoDTO } from "src/dto/ICreateTodoDTO";

import { document } from "../utils/dynamoClient";

import { uuid } from "uuidv4";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const { title, deadline } = JSON.parse(event.body) as ICreateTodoDTO;

  await document
    .put({
      TableName: "tb_todo",
      Item: {
        id: uuid(),
        user_id,
        title,
        done: false,
        deadline,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      contentType: "application/json",
    },
  };
};
