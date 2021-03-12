const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIA36QDJI7LKNN5SUOM",
  secretAccessKey: "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",
  // region: "sa-east-1",
  region: "us-east-2"
});

const model =  {
  async invokeLambda(insurer, event) {
    const params = {
      FunctionName: insurer,
      Payload: JSON.stringify(event),
    };
    const result = await new AWS.Lambda().invoke(params).promise();
    console.log("RESULT",JSON.stringify(event))
    return result;
  },
};
export { model }