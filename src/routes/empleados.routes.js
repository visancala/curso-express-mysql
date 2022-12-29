import { Router } from 'express'
import { getEmpleados, createEmpleados, updateEmpleados, deleteEmpleados, getEmpleado } from '../controllers/empleados.controllers.js'


const router = Router()

router.get('/empleados', getEmpleados)
router.get('/empleados/:id', getEmpleado)
router.post('/empleados', createEmpleados)
//router.put('/empleados/:id', updateEmpleados)
router.patch('/empleados/:id', updateEmpleados)
router.delete('/empleados/:id', deleteEmpleados)

export default router