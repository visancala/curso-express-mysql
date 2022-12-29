import { pool } from '../db.js'


 export const ping = async (req,res) => {
    const [result] = await pool.query ('select nombre from torneo where id=2')
    res.json(result[0])
}