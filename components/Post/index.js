// src/components/Post/index.js

import React, { Component } from "react";


class Post extends Component {

    render() {

        return <article className="Post" >

            <header>

                <div className="Post-user" >

                    <div className="Post-user-profilepicture">

                        <img src="/creadores/kaleb.jpg" alt="John D. Veloper" />

                    </div>

                    <div className="Post-user-nickname">

                        <span>John Doe</span>

                    </div>

                </div>

            </header>

            <div className="Post-image">

                <div className="Post-image-bg">

                    <img alt="Icon Living" src="/images/ios/inicio.png" />
                    

                </div>

            </div>

            <div className="Post-caption">

                <strong>John D. Veloper </strong> Loving Educative!

            </div>

        </article>;

    }

}

export default Post;