using Microsoft.Owin.Security.DataHandler.Encoder;
using Prova1.Auth.Entities;
using System;
using System.Collections.Concurrent;
using System.Security.Cryptography;

namespace Prova1.Auth
{
    /// <summary>
    /// Provedor de clients da Prova1.Auth. É o responsável por gerar e prover os clients cadastrados. 
    /// 
    /// Um client é uma aplicação que utiliza os tokens dessa API como forma de auth
    /// e são identificados por uma chave alfanumérica, chamada de client_id
    /// que serve para indicar quais chaves privadas (secret) usar, além da identificação do client que solicita.
    /// 
    /// </summary>
    public class AppClientsStore
    {
        // Store de clients
        public static ConcurrentDictionary<string, AppClient> AppClientsList = new ConcurrentDictionary<string, AppClient>();

        /// <summary>
        /// 
        /// Método de inicialização que adiciona os client_ids já gerados na lista
        /// que será usada para validar se a chave informada existe ou não (no provedor).
        /// 
        /// </summary>
        static AppClientsStore()
        {
            // Adiciona a Prova1.API como um client dessa api de Auth
            AppClientsList.TryAdd("3b9a77fb35a54e40815f4fa8641234c5",
                                   new AppClient
                                   {
                                       ClientId = "3b9a77fb35a54e40815f4fa8641234c5",
                                       Base64Secret = "nbwQ3HDjLNvOnuNyQkBxADEVEwGBEovFZKakYoBQRQo",
                                       Name = "Prova1.API"
                                   });

        }

        /// <summary>
        /// 
        /// Esse método é responsável por validar se a API da Aplicação está registrada para usar a API de Autenticação
        /// Tudo isso ocorrerá através do valor do ClientId informado, que deve ser informado no Request sem a chave criptografada
        /// Diante do "caminho feliz" o contexto do Request será marcado como válido
        /// 
        /// </summary>
        /// <param name="name">É o nome do novo client. Não confundir com o client_id, que é o identificador e será gerado</param>
        /// <returns>Gera e retorna um client do tipo AppClient</returns>
        public static AppClient AddClient(string name)
        {
            var clientId = Guid.NewGuid().ToString("N");

            var key = new byte[32];
            RNGCryptoServiceProvider.Create().GetBytes(key);
            var base64Secret = TextEncodings.Base64Url.Encode(key);

            AppClient newAudience = new AppClient { ClientId = clientId, Base64Secret = base64Secret, Name = name };
            AppClientsList.TryAdd(clientId, newAudience);
            return newAudience;
        }

        /// <summary>
        /// 
        /// Pesquisa na lista de clients cadastrados um client_id informado.
        /// 
        /// </summary>
        /// <param name="clientId">É o identificador client_id que será o atributo de busca</param>
        /// <returns>Caso encontre o client_id correspondente, retorna o AppClient. Caso negativo, retorna null.</returns>
        public static AppClient FindClient(string clientId)
        {
            AppClient audience = null;
            if (AppClientsList.TryGetValue(clientId, out audience))
            {
                return audience;
            }
            return null;
        }
    }
}