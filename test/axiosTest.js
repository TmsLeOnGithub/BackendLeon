import axios from  'axios'
import {strictEqual, deepStrictEqual} from 'assert'
const enviar =productos=> axios.post('http://localhost:8080/ingreso',{productos})
const recibir =()=> axios.get('http://localhost:8080/egreso')
