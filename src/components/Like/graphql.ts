export const CREATE_LIKE = `
  mutation($model_type: String!, $model_id: ID!) {
    like: createLike(model_type: $model_type, model_id: $model_id)
  }
`

export const DELETE_LIKE = `
  mutation($model_type: String!, $model_id: ID!) {
    like: deleteLike(model_type: $model_type, model_id: $model_id)
  }
`