const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "AKIA36QDJI7LKOHCVSFH",
  secretAccessKey: "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",
  region: "us-east-2",
});

const model =  {
  async invokeLambda(insurer, event) {
    const params = {
      FunctionName: insurer,
      Payload: JSON.stringify(event),
    };
    const result = await new AWS.Lambda().invoke(params).promise();
    return result;
  },
};
export { model }