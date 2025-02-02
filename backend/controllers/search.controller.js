import { User } from "../models/user.model.js"
import { fetchFromTMDB } from "../services/tmdb.service.js"

export async function searchPerson(req, res) {
    const { query } = req.params

    try {
        const responce = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (responce.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: responce.results[0].id,
                    Image: responce.results[0].profile_path,
                    title: responce.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({ success: true, content: responce.results })

    } catch (error) {
        console.log("Error in searchPerson Controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function searchMovie(req, res) {
    const { query } = req.params

    try {
        const responce = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)

        if (responce.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: responce.results[0].id,
                    Image: responce.results[0].poster_path,
                    title: responce.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                }
            }
        })
        res.status(200).json({ success: true, content: responce.results })

    } catch (error) {
        console.log("Error in searchMovie Controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function searchTv(req, res) {

    const { query } = req.params

    try {
        const responce = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)

        if (responce.results.length === 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: responce.results[0].id,
                    Image: responce.results[0].poster_path,
                    title: responce.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({ success: true, content: responce.results })

    } catch (error) {
        console.log("Error in searchTv Controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export async function getSearchHistory(req, res) {
    try {
        // const user = await User.findById(req.user._id)
        res.status(200).json({ success: true, content: req.user.searchHistory })

    } catch (error) {
        console.log("Error in getSearchHistory Controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params

    id = parseInt(id)

    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                }
            }
        })
        res.status(200).json({ success: true, message: "Item removed from search history" })

    } catch (error) {
        console.log("Error in removeItemFromSearchHistory Controller", error.message)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}