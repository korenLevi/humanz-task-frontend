import { httpService } from './httpService'
export const clientService = {
  query,
  filter,
  removeClientById,
  getClientById,
  getEmptyClient,
  saveClient,
  checkValidation
}

let clients = null

async function query() {
  clients = await httpService.get('client')
  return clients
}

async function filter(filterBy = '') {
  if (!clients) return query()
  filterBy = filterBy.toLocaleLowerCase()
  return clients.filter((client) => {
    return (
      client.full_name.toLocaleLowerCase().includes(filterBy) ||
      client.phone_number.toLocaleLowerCase().includes(filterBy) ||
      client.id_number.toLocaleLowerCase().includes(filterBy) ||
      client.ip_address.toLocaleLowerCase().includes(filterBy) ||
      client.city?.toLocaleLowerCase().includes(filterBy) ||
      client.country?.toLocaleLowerCase().includes(filterBy)
    )
  })
}

async function removeClientById(id) {
  await httpService.delete(`client/${id}`)
}

async function getClientById(id) {
  const client = clients.find((client) => client.id_number === id)
  return client
}

async function saveClient(clientToSave) {
  try {
    if (clientToSave._id) {
      await httpService.put(`client/${clientToSave._id}`, clientToSave)
    } else {
     return await httpService.post(`client`, clientToSave)
    }
  } catch (err) {
    throw err
  }
}


function isValidIsraeliID(id) {
  var id = String(id).trim()
  if (id.length > 9 || id.length < 5 || isNaN(id)) return false
  
  id = id.length < 9 ? ('00000000' + id).slice(-9) : id
  
  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1)
      return counter + (step > 9 ? step - 9 : step)
    }) %
    10 ===
    0
    )
  }
  function checkValidation(client){
    // let re = new RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')
    // re.test(client.ip_address) 
    if(!isValidIsraeliID(client.id_number) 
    || client.full_name.length < 5 
    || client.phone_number < 10) return false
    
    return true
  }
  function getEmptyClient() {
    return {
      id_number: '',
      full_name: '',
      ip_address: '',
      phone_number: '',
    }
  }