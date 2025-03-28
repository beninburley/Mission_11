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

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? categories = null)
        {
            var totalNumBooks = _context.Books.Count();

            var booksQuery = _context.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                booksQuery = booksQuery.Where(p => categories.Contains(p.Category));
            }

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

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes() {
            var categories = _context.Books.Select(b => b.Category).Distinct().ToList();

            return Ok(categories);
        }

    }
}
