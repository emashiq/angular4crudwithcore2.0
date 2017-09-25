using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DotNetCoreAPI.Controllers {
    public class MoviesController : Controller {
        private readonly ApplicationDbContext _context;

        public MoviesController (ApplicationDbContext context) {
            _context = context;
        }

        // GET: Movies
        public async Task<IActionResult> Index () {
                return View (await _context.Movies.ToListAsync ());
            }
            [HttpGet]
            [Route ("api/GetAllMovies")]
        public IEnumerable<Movie> GetAll () {
                return _context.Movies.ToList ();
            }
            [HttpPost]
            [Route ("api/movies")]
        public IActionResult ApiCreate ([FromBody] Movie movie) {
            
            if (movie == null) {
                return BadRequest ();
            }
            _context.Add(movie);
            _context.SaveChanges();
            return Ok(movie);
            
        }
        [HttpGet("id")]
        [Route("api/movies")]
        public IActionResult GetMovieById(int ?id){
             if (id == null) {
                return BadRequest ();
            }
             var movie =  _context.Movies
                .SingleOrDefault (m => m.ID == id);
            return Ok(movie);
        }
       
        // GET: Movies/Details/5
        public async Task<IActionResult> Details (int? id) {
            if (id == null) {
                return NotFound ();
            }

            var movie = await _context.Movies
                .SingleOrDefaultAsync (m => m.ID == id);
            if (movie == null) {
                return NotFound ();
            }

            return View (movie);
        }
       
        // GET: Movies/Create
        public IActionResult Create () {
            return View ();
        }
        [HttpPut("id")]
        [Route("api/movies/update")]
        public IActionResult MovieUpdate(long id, [FromBody] Movie item){
          
            var movie = _context.Movies.FirstOrDefault(t => t.ID == id);
             if (movie == null)
                {
                    return NotFound();
                }
                movie.Price=item.Price;
                movie.Title=item.Title;
                movie.ReleaseDate=item.ReleaseDate;
                movie.Genre=item.Genre;
                 _context.Movies.Update(movie);
                _context.SaveChanges();
                return Ok(item);
                
        }
        // POST: Movies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create ([Bind ("ID,Title,ReleaseDate,Genre,Price")] Movie movie) {
            if (ModelState.IsValid) {
                _context.Add (movie);
                await _context.SaveChangesAsync ();
                return RedirectToAction (nameof (Index));
            }
            return View (movie);
        }

        // GET: Movies/Edit/5
        public async Task<IActionResult> Edit (int? id) {
            if (id == null) {
                return NotFound ();
            }

            var movie = await _context.Movies.SingleOrDefaultAsync (m => m.ID == id);
            if (movie == null) {
                return NotFound ();
            }
            return View (movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit (int id, [Bind ("ID,Title,ReleaseDate,Genre,Price")] Movie movie) {
            if (id != movie.ID) {
                return NotFound ();
            }

            if (ModelState.IsValid) {
                try {
                    _context.Update (movie);
                    await _context.SaveChangesAsync ();
                } catch (DbUpdateConcurrencyException) {
                    if (!MovieExists (movie.ID)) {
                        return NotFound ();
                    } else {
                        throw;
                    }
                }
                return RedirectToAction (nameof (Index));
            }
            return View (movie);
        }

        // GET: Movies/Delete/5
        public async Task<IActionResult> Delete (int? id) {
            if (id == null) {
                return NotFound ();
            }

            var movie = await _context.Movies
                .SingleOrDefaultAsync (m => m.ID == id);
            if (movie == null) {
                return NotFound ();
            }

            return View (movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName ("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed (int id) {
            var movie = await _context.Movies.SingleOrDefaultAsync (m => m.ID == id);
            _context.Movies.Remove (movie);
            await _context.SaveChangesAsync ();
            return RedirectToAction (nameof (Index));
        }

        private bool MovieExists (int id) {
            return _context.Movies.Any (e => e.ID == id);
        }
    }
}