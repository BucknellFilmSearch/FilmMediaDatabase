import * as React from "react";

import { Link } from 'react-router'

let GENRES = ["Action", "Thriller", "Comedy", "Family", "Adventure", "Mystery", "Romance", "Sci-Fi", "Horror",
    "Drama", "Biography", "Fantasy", "Crime", "War", "Animation", "History", "Musical"];

export class InputForm extends React.Component<any, {}> {
    render() {
        return (
            <div>
                <input name="keywordOrPhrase" type="text" value="phone" placeholder ="Keyword/phrase..." required
                       oninvalid="this.setCustomValidity('A keyword or phrase is required')"
                       oninput="setCustomValidity('')"/>
                <br />
                Limit results to a specific genre:
                <select name="genre">
                    {GENRES.map(function(value, index)
                        {return (
                            index == 0 ? <option selected={"selected"} value="All">All Genres</option> :
                                <option value={value}>{value}</option>
                        )}
                    )}
                </select>
                <br />
                Limit results to movies originally released between:
                <br />

                <input name="earliestReleaseYear" type="number" placeholder="1996" min="1996" max="2016" />
                and
                <input name="latestReleaseYear" type="number" placeholder="2016" min="1996" max="2016" />
                <br />
                {/*<input value="Search" type="submit" />*/}
                <Link className="btn btn-primary" to={"/phone/All/1996/2016/1"} >Search</Link>
            </div>

        )
    }
}