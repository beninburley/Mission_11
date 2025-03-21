using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission_11.API.Data;

namespace Mission_11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {

        private BookDbContext _context;
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc")
        {
            var totalNumBooks = _context.Books.Count();

            var booksQuery = _context.Books.AsQueryable();

            // Sorting logic
            booksQuery = sortOrder.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => b.Title)
                : booksQuery.OrderBy(b => b.Title);

            var apiReturn = booksQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = apiReturn,
                TotalNumBooks = totalNumBooks
            });
        }

    }
}
