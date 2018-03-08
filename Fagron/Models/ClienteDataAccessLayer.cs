using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Fagron.Models
{
    public class ClienteDataAccessLayer
    {
        string connectionString = "Data Source=DESKTOP-VAN4294;Database=FAGRON_DB;Integrated Security=True;MultipleActiveResultSets=True";

        //To View all clientes details
        public IEnumerable<Cliente> GetAllClientes()
        {
            try
            {
                List<Cliente> lstcliente = new List<Cliente>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllClientes", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Cliente cliente = new Cliente();

                        cliente.ClienteId = Convert.ToInt32(rdr["ClienteID"]);
                        cliente.Nome = rdr["Nome"].ToString();
                        cliente.Sobrenome = rdr["Sobrenome"].ToString();
                        cliente.DataNascimento = Convert.ToDateTime(rdr["DataNascimento"]);
                        cliente.Idade = rdr.GetInt32(rdr.GetOrdinal("Idade"));
                        cliente.Profissao = rdr["Profissao"].ToString();

                        lstcliente.Add(cliente);
                    }
                    con.Close();
                }
                return lstcliente;
            }
            catch
            {
                throw;
            }
        }

        //To Add new cliente record 
        public int AddCliente(Cliente cliente)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddCliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Nome", cliente.Nome);
                    cmd.Parameters.AddWithValue("@Sobrenome", cliente.Sobrenome);
                    cmd.Parameters.AddWithValue("@DataNascimento", cliente.DataNascimento);
                    cmd.Parameters.AddWithValue("@Idade", cliente.Idade);
                    cmd.Parameters.AddWithValue("@Profissao", cliente.Profissao);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar cliente
        public int UpdateCliente(Cliente cliente)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateCliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ClienteId", cliente.ClienteId);
                    cmd.Parameters.AddWithValue("@Nome", cliente.Nome);
                    cmd.Parameters.AddWithValue("@Sobrenome", cliente.Sobrenome);
                    cmd.Parameters.AddWithValue("@DataNascimento", cliente.DataNascimento);
                    cmd.Parameters.AddWithValue("@Idade", cliente.Idade);
                    cmd.Parameters.AddWithValue("@Profissao", cliente.Profissao);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular cliente
        public Cliente GetClienteData(int clienteid)
        {
            try
            {
                Cliente cliente = new Cliente();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM Cliente WHERE ClienteID= " + clienteid;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        cliente.ClienteId = Convert.ToInt32(rdr["ClienteID"]);
                        cliente.Nome = rdr["Nome"].ToString();
                        cliente.Sobrenome = rdr["Sobrenome"].ToString();
                        cliente.DataNascimento = Convert.ToDateTime(rdr["DataNascimento"]);
                        cliente.Idade = rdr.GetInt32(rdr.GetOrdinal("Idade"));
                        cliente.Profissao = rdr["Profissao"].ToString();
                    }
                }
                return cliente;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular cliente
        public int DeleteCliente(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteCliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ClienteId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
