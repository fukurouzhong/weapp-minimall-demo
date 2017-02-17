const apiURL = 'https://test99.allinpaymall.com/wx/test.aspx';

const wxRequest = (params, url) => {
    wx.request({
        url,
        method: 'POST',
        data: params.data || {},
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        success(res) {
            if(params.success) {
                params.success(res);
            }
        },
        fail(res) {
            if (params.fail) {
                params.fail(res);
            }
        },
        complete(res) {
            if (params.complete) {
                params.complete(res)
            }
        },
    });
};

const getPLById = (params) => {
    wxRequest(params, `${apiURL}`);
}

const getProgramDetailById = (params) => {
    wxRequest(params, `${apiURL}`);
}

module.exports = {
    getPLById,
    getProgramDetailById,
};

