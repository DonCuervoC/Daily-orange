import React, { useEffect, useState } from 'react';
import { map, size } from "lodash";
import { NewsLetter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { EmailItem } from "../EmailItem";
import { Loader, Pagination } from 'semantic-ui-react';
import "./ListEmails.scss";

const newsLetterController = new NewsLetter();

export function ListEmails() {

    const [emails, setEmails] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);
    const { accessToken } = useAuth();

    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await newsLetterController.getEmails(accessToken, page);
                // console.log(response);
                setEmails(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                });
            } catch (error) {
                console.error(error)
            }
        })();
    }, [page,reload]);

    const changePage = (_, data) => {
        // console.log(data);
        setPage(data.activePage);
    };

    if (!emails) return <Loader active inline="centered" />
    if (size(emails) === 0) return "There are no registered emails"

    return (
        <div className='list-emails'>
            {map(emails, (email) => (
                <EmailItem key={email._id} email={email} onReload={onReload} />
            ))}
            <div className='list-emails__pagination'>
                {/* Pagination... */}
                <Pagination
                    totalPages={pagination.pages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={false}
                    firstItem={false}
                    lastItem={false}

                    onPageChange={changePage}
                />
            </div>
        </div>
    );
}
