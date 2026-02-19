import { createSupplier, updateSupplier, toggleSupplier, listSuppliers } from './suppliers.service.js'

export async function createSupplierController(req, res) {
  res.status(201).json({ ok: true, supplier: await createSupplier(req.validated.body) })
}
export async function updateSupplierController(req, res) {
  await updateSupplier(req.validated.params.id, req.validated.body)
  res.json({ ok: true })
}
export async function toggleSupplierController(req, res) {
  await toggleSupplier(req.validated.params.id, req.validated.body.active)
  res.json({ ok: true })
}
export async function listSuppliersController(req, res) {
  res.json({ ok: true, ...(await listSuppliers(req.validated.query)) })
}
