export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    })
    req.validated = parsed
    next()
  } catch (e) {
    next({ status: 400, message: 'Validation error', details: e?.issues || e })
  }
}
