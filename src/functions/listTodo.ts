import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamoClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  console.log(user_id)

  await document
    .query({
      TableName: "tb_todo",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": user_id,
      },
    })
    .promise();

  // const userTodo = response.Items[0];

  // if (userTodo) {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       id: userTodo.id,
  //       user_id: userTodo.user_id,
  //       title: userTodo.title,
  //       done: userTodo.done,
  //       deadline: userTodo.deadline,
  //     }),
  //   };
  // }

  return {
      statusCode: 200,
      body: JSON.stringify({
        message: "OK",  
    })
  }

  // return {
  //   statusCode: 400,
  //   body: JSON.stringify({
  //     message: "Todo not exist!",
  //   }),
  // };
};
