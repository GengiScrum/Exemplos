using Prova1.API.Exceptions;
using Prova1.Domain.Exceptions;
using System;
using System.Net;
using System.Web.Http;
using FluentValidation.Results;
using AutoMapper.QueryableExtensions;
using System.Linq;
using System.Net.Http;
using Prova1.Infra.Csv;
using System.Text;
using System.IO;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Prova1.API.Models;
using AutoMapper;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;

namespace Prova1.API.Controllers.Common
{
    /// <summary>
    /// Controlador Base do Prova1.API
    /// 
    /// Essa classe é responsável por prover propriedades e métodos úteis nos demais controllers 
    /// que vão possuir essa classe como pai (herança).
    /// 
    /// Ela também herda da classe ApiController, com isso, suas implementações já se tornam controllers da API.
    /// </summary>
    public class ApiControllerBase : ApiController
    {

        #region Handlers
        /// <summary>
        /// Manuseia o callback. Valida se é necessário retornar erro ou o próprio TSuccess
        /// </summary> 
        /// <typeparam name="TSuccess"></typeparam>
        /// <param name="func">É a função que irá retornar o valor para o payload</param>
        /// <returns></returns>
        protected IHttpActionResult HandleCallback<TSuccess>(Func<TSuccess> func)
        {
            try
            {
                return Ok(func());
            }
            catch (Exception e)
            {
                return HandleFailure(e);
            }
        }

        /// <summary>
        /// Manuseia a query para aplicar as opções do odata.
        ///
        /// Esse método vai gerar o PageResult associando os dados (query) com as opções do odata (queryOptions) 
        /// após isso ele monta a resposta HTTP solicitada, conforme headers.
        /// 
        /// </summary>
        /// <typeparam name="TQueryOptions">Tipo do obj de origem (domínio)</typeparam>
        /// <typeparam name="TResult">Tipo de retorno </typeparam>
        /// <param name="query">IQueryable(TQueryOptions)</param>
        /// <param name="queryOptions">OdataQueryOptions(TQueryOptions)</param>
        /// <returns>IHttpActionResult(TResult) com o resultado da operação</returns>
        protected IHttpActionResult HandleQuery<TQueryOptions, TResult>(IQueryable<TQueryOptions> query, ODataQueryOptions<TQueryOptions> queryOptions)
        {
            if (Request.Headers.Accept.Contains(MediaTypeWithQualityHeaderValue.Parse(MediaTypes.Csv)))
                return ResponseMessage(HandleCSVFile<TQueryOptions, TResult>(query, queryOptions));

            return Ok(HandlePageResult<TQueryOptions, TResult>(query, queryOptions));
        }

        /// <summary>
        /// Aplica o filtro (odata) a query e retora um pageresult criado através do project da OriginType para RetType. 
        /// </summary>
        /// <typeparam name="OriginType">Tipo do obj de origem (domínio)</typeparam>
        /// <typeparam name="RetType">Tipo de retorno objQuery</typeparam>
        /// <param name="query">IQueryable(OriginType)</param>
        /// <param name="queryOptions">OdataQueryOptions</param>
        /// <returns>PageResult(RetType)</returns>
        protected PageResult<RetType> HandlePageResult<OriginType, RetType>(IQueryable<OriginType> query, ODataQueryOptions<OriginType> queryOptions)
        {
            // Executamos a query com o .ToList() pois precisamos dos dados antes de converter com o ProjectTo
            var queryResults = queryOptions.ApplyTo(query).Cast<OriginType>().ToList().AsQueryable();
            // Montamos o PageResult convertendo para o novo tipo
            var pageResult = new PageResult<RetType>(queryResults.ProjectTo<RetType>(),
                                                    Request.ODataProperties().NextLink,
                                                    Request.ODataProperties().TotalCount);

            return pageResult;
        }
        #endregion


        #region HandlersFailure
        /// <summary>
        /// Verifica a exceção passada por parametro para passar o StatusCode correto para o frontend.
        /// </summary>
        /// <typeparam name="T">Qualquer classe que herde de Exeption</typeparam>
        /// <param name="exceptionToHandle">obj de exceção</param>
        /// <returns></returns>
        protected IHttpActionResult HandleFailure<T>(T exceptionToHandle) where T : Exception
        {
            var exceptionPayload = ExceptionPayload.New(exceptionToHandle);
            return exceptionToHandle is BusinessException ?
                Content(HttpStatusCode.BadRequest, exceptionPayload) :
                Content(HttpStatusCode.InternalServerError, exceptionPayload);
        }

        /// <summary>
        /// Retorna IHttpStatusCode de erro + erros da validação.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="validationFailure">Erros de validação (ValidationFailure)</param>
        /// <returns>IHttpActionResult com os erros e status code padrão</returns>
        protected IHttpActionResult HandleValidationFailure<T>(IList<T> validationFailure) where T : ValidationFailure
        {
            return Content(HttpStatusCode.BadRequest, validationFailure);
        }

        #endregion

        #region  Handlers CSV
        /// <summary>
        /// Aplica o filtro (odata) a query, monta um HttpResultMessage com o arquivo CSV
        /// </summary>
        /// <typeparam name="TQueryOptions">Tipo do obj de origem (domínio)</typeparam>
        /// <typeparam name="TResult">Tipo de retorno objQuery</typeparam>
        /// <param name="query">IQueryable(TQueryOptions)</param>
        /// <param name="queryOptions">OdataQueryOptions</param>
        /// <returns>HttpResponseMessage</returns>
        private HttpResponseMessage HandleCSVFile<TQueryOptions, TResult>(IQueryable<TQueryOptions> query, ODataQueryOptions<TQueryOptions> queryOptions)
        {
            var queryResults = queryOptions.ApplyTo(query);
            var project = queryResults.ProjectTo<TResult>();

            var csv = project.ToCsv<TResult>(";");
            var bytes = Encoding.UTF8.GetBytes(csv);
            var stream = new MemoryStream(bytes, 0, bytes.Length, false, true);

            var result = new HttpResponseMessage(HttpStatusCode.OK) { Content = new ByteArrayContent(stream.GetBuffer()) };

            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = string.Format("export{0}.csv", DateTime.UtcNow.ToString("yyyyMMddhhmmss"))
            };

            return result;
        }

        #endregion

    }
}