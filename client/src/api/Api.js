const url = "http://localhost:3000";

export const Api = {
    // user
    getUser() {
        return new Promise((resolve, reject) => {
        fetch(url + '/profile')
            .then((res) => {
                console.log(res);
                res.json()
                    .then((r) => {
                        console.log(r);
                        resolve(r);
                    });
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    getFbProfile() {
        return new Promise((resolve, reject) => {
            fetch(url + '/api/login/facebook')
                .then((res) => {
                    console.log(res);
                    res.json()
                        .then((r) => {
                            console.log(r);
                            resolve(r);
                        })
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    // poll

    // other
}