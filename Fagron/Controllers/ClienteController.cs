using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Fagron.Models;

namespace Fagron.Controllers
{
    public class ClienteController : Controller
    {
        ClienteDataAccessLayer objcliente = new ClienteDataAccessLayer();

        [HttpGet("[action]")]
        [Route("api/Cliente/Index")]
        public IEnumerable<Cliente> Index()
        {
            return objcliente.GetAllClientes();
        }

        [HttpPost]
        [Route("api/Cliente/Create")]
        public int Create([FromBody] Cliente cliente)
        {
            return objcliente.AddCliente(cliente);
        }

        [HttpGet]
        [Route("api/Cliente/Details/{clienteId}")]
        public Cliente Details(int clienteId)
        {
            return objcliente.GetClienteData(clienteId);
        }

        [HttpPut]
        [Route("api/Cliente/Edit")]
        public int Edit([FromBody]Cliente cliente)
        {
            return objcliente.UpdateCliente(cliente);
        }

        [HttpDelete]
        [Route("api/Cliente/Delete/{clienteId}")]
        public int Delete(int clienteId)
        {
            return objcliente.DeleteCliente(clienteId);
        }
    }
}
