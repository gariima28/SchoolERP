import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';

const Container = styled.div`
  .form-control {
    background-color: #fff !important;
    box-shadow: none !important;
    border-radius: 5px 0px 0px 5px !important;
    border: 1.5px solid var(--fontControlBorder) !important;
  }

  .searchButtons {
    border-radius: 0px 5px 5px 0px !important;
    background-color: #008479 !important;
    border: 1.5px solid var(--fontControlBorder) !important;
  }

  .smallSearchButtons {
    background-color: #008479 !important;
    border: 1.5px solid var(--fontControlBorder) !important;
    color: #fff !important;
  }

  .second-add-button {
    background-color: #008479 !important;
    border-color: #008479 !important;
  }
`;

const ActionControls = ({
    showAddButton = true,
    addButtonText = 'Add',
    addButtonAction,
    showSecondAddButton = false,
    secondAddButtonText = 'Add Another',
    secondAddButtonAction,
    showSearch = true,
    searchValue = '',
    searchAction,
    onSearchChange,
    showExportPDF = true,
    exportPDFText = 'Export PDF',
    exportPDFAction,
    exportPDFFileName = 'document.pdf',
    showExportCSV = true,
    exportCSVText = 'Export XLSX',
    exportCSVAction,
    exportCSVFileName = 'document.xlsx',
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const prevSearchLength = useRef(searchValue.length);

    // Debounced search function for backspace
    const debouncedSearch = useCallback(
        debounce((value) => {
            if (value.trim() === '') {
                searchAction(value);
            } else {
                searchAction(value);
            }
        }, 2000),
        [searchAction]
    );

    // Handle search input change
    const handleSearchChange = (value) => {
        const currentLength = value.length;
        onSearchChange(value);
        const isBackspacing = currentLength < prevSearchLength.current;
        if (isBackspacing) {
            debouncedSearch(value);
        }
        prevSearchLength.current = currentLength;
    };

    // Handle search button click
    const handleSearchButton = () => {
        if (searchValue.trim() === '') {
            toast.error('Search key is empty');
            return;
        }
        searchAction(searchValue);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // Handle CSV download
    const handleExportCSV = async () => {
        try {
            const response = await exportCSVAction();
            console.log(response, 'csvvvv')
            if (response?.status === 200 && response?.data?.status === 'success') {
                const { csvUrl } = response.data;
                if (csvUrl) {
                    const link = document.createElement('a');
                    link.href = csvUrl;
                    link.download = exportCSVFileName; // Use provided filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success(response?.data?.message || 'CSV downloaded successfully');
                } else {
                    toast.error('No CSV URL provided in the response');
                }
            } else {
                toast.error(response?.data?.message || 'Failed to fetch CSV');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error downloading CSV');
        }
        finally {
            // setloaderState(false);
        }
    };

    // Handle PDF download
    const handleExportPDF = async () => {
        try {
            const response = await exportPDFAction();
            console.log(response);

            if (response?.status === 200 && response?.data?.status === 'success') {
                const base64PDF = response.data.pdf; // the PDF data (Base64 string)
                const fileName = 'Data.pdf'; // or use a dynamic name if you have one

                if (base64PDF) {
                    // Convert Base64 → Blob
                    const byteCharacters = atob(base64PDF);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'application/pdf' });

                    // Create a temporary download link
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();

                    // Cleanup
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);

                    toast.success(response?.data?.message || 'PDF downloaded successfully');
                } else {
                    toast.error('No PDF data provided in the response');
                }
            } else {
                toast.error(response?.data?.message || 'Failed to fetch PDF');
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Error downloading PDF');
        }
    };

    return (
        <Container>
            <div className="d-flex justify-content-end align-items-center gap-2 mb-3 position-relative">
                {/* Export PDF Button */}
                {showExportPDF && (
                    <button
                        className="btn btn-outline-danger d-flex align-items-center gap-1"
                        style={{ color: '#dc3545', borderColor: '#dc3545', backgroundColor: '#fff' }}
                        onClick={handleExportPDF}
                        title={exportPDFText}
                        disabled
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 384 512">
                            <path fill="#dc3545" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9c8.4 0 7.6 36.9 2 46.9m-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7c18.3-7 39-17.2 62.9-21.9c-12.7-9.6-24.9-23.4-34.5-40.8M86.1 428.1c0 .8 13.2-5.4 34.9-40.2c-6.7 6.3-29.1 24.5-34.9 40.2M248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24m-8 171.8c-20-12.2-33.3-29-42.7-53.8c4.5-18.5 11.6-46.6 6.2-64.2c-4.7-29.4-42.4-26.5-47.8-6.8c-5 18.3-.4 44.1 8.1 77c-11.6 27.6-28.7 64.6-40.8 85.8c-.1 0-.1.1-.2.1c-27.1 13.9-73.6 44.5-54.5 68c5.6 6.9 16 10 21.5 10c17.9 0 35.7-18 61.1-61.8c25.8-8.5 54.1-19.1 79-23.2c21.7 11.8 47.1 19.5 64 19.5c29.2 0 31.2-32 19.7-43.4c-13.9-13.6-54.3-9.7-73.6-7.2M377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9m-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9c37.1 15.8 42.8 9 42.8 9" stroke-width="13" stroke="" />
                        </svg>
                        <span className="d-none d-md-inline">{exportPDFText}</span>
                    </button>
                )}

                {/* Export XLSX Button */}
                {showExportCSV && (
                    <button
                        className="btn btn-outline-success d-flex align-items-center gap-1"
                        style={{ color: '#008479', borderColor: '#008479', backgroundColor: '#fff' }}
                        onClick={handleExportCSV}
                        title={exportCSVText}
                    >
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 24">
                            <path fill="#198754" fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2zm1.018 8.828a2.34 2.34 0 0 0-2.373 2.13v.008a2.32 2.32 0 0 0 2.06 2.497l.535.059a1 1 0 0 0 .136.006a.272.272 0 0 1 .263.367l-.008.02l-.018.044l-.078.02a2 2 0 0 1-.297.021h-1.13a1 1 0 1 0 0 2h1.13c.417 0 .892-.05 1.324-.279c.47-.248.78-.648.953-1.134a2.272 2.272 0 0 0-2.115-3.06l-.478-.052a.32.32 0 0 1-.285-.341a.34.34 0 0 1 .344-.306l.94.02a1 1 0 1 0 .043-2l-.943-.02zm7.933 1.482a1 1 0 1 0-1.902-.62l-.57 1.747l-.522-1.726a1 1 0 0 0-1.914.578l1.443 4.773a1 1 0 0 0 1.908.021zm-13.762.88a.65.65 0 0 1 .458-.19h1.018a1 1 0 1 0 0-2H6.647A2.647 2.647 0 0 0 4 13.647v1.706A2.647 2.647 0 0 0 6.647 18h1.018a1 1 0 1 0 0-2H6.647A.647.647 0 0 1 6 15.353v-1.706c0-.172.068-.336.19-.457Z" clip-rule="evenodd" stroke-width="0.2" stroke="" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path fill="#008479" fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM7.86 14.841a1.13 1.13 0 0 0 .401.823q.195.162.479.252q.284.091.665.091q.507 0 .858-.158q.355-.158.54-.44a1.17 1.17 0 0 0 .187-.656q0-.336-.135-.56a1 1 0 0 0-.375-.357a2 2 0 0 0-.565-.21l-.621-.144a1 1 0 0 1-.405-.176a.37.37 0 0 1-.143-.299q0-.234.184-.384q.188-.152.513-.152q.214 0 .37.068a.6.6 0 0 1 .245.181a.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.199-.566a1.2 1.2 0 0 0-.5-.41a1.8 1.8 0 0 0-.78-.152q-.44 0-.777.15q-.336.149-.527.421q-.19.273-.19.639q0 .302.123.524t.351.367q.229.143.54.213l.618.144q.31.073.462.193a.39.39 0 0 1 .153.326a.5.5 0 0 1-.085.29a.56.56 0 0 1-.255.193q-.168.07-.413.07q-.176 0-.32-.04a.8.8 0 0 1-.249-.115a.58.58 0 0 1-.255-.384zm-3.726-2.909h.893l-1.274 2.007l1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016l-1.228-1.983h.931l.832 1.438h.036zm1.923 3.325h1.697v.674H5.266v-3.999h.791zm7.636-3.325h.893l-1.274 2.007l1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016l-1.228-1.983h.931l.832 1.438h.036z" />
                        </svg>
                        <span className="d-none d-md-inline">{exportCSVText}</span>
                    </button>
                )}

                {/* Search Bar */}
                {showSearch && (
                    <>
                        <div className="d-none d-md-flex align-items-center">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                style={{ width: '250px' }}
                                value={searchValue}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                            <button
                                className="btn searchButtons text-white"
                                onClick={handleSearchButton}
                                disabled={!searchValue.trim()}
                            >
                                Search
                            </button>
                        </div>
                        <div className="d-md-none position-relative">
                            <button
                                className="btn smallSearchButtons btn-sm"
                                onClick={handleSearchToggle}
                                title="Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" stroke-width="0.2" stroke="" />
                                </svg>
                            </button>
                            {isSearchOpen && (
                                <div
                                    className="d-flex position-absolute bg-white shadow p-2"
                                    style={{ zIndex: 1000, right: '0', top: '40px', width: 'fit-content' }}
                                >
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            style={{ width: '250px' }}
                                            value={searchValue}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                        />
                                        <button
                                            className="btn searchButtons text-white"
                                            onClick={handleSearchButton}
                                            disabled={!searchValue.trim()}
                                        >
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Second Add Button */}
                {showSecondAddButton && (
                    <button
                        className="btn btn-primary d-flex align-items-center p-2 second-add-button"
                        style={{ backgroundColor: '#008479', borderColor: '#008479' }}
                        onClick={secondAddButtonAction}
                        title={secondAddButtonText}
                    >
                        <span>+</span>
                        <span className='d-md-none d-inline ms-1'>Add</span>
                        <span className="d-none d-md-inline ms-1">{secondAddButtonText}</span>
                    </button>
                )}

                {/* First Add Button */}
                {showAddButton && (
                    <button
                        className="btn btn-primary d-flex align-items-center custompadding"
                        style={{ backgroundColor: '#008479', borderColor: '#008479' }}
                        onClick={addButtonAction}
                        title={addButtonText}
                    >
                        <span>+</span>
                        <span className='d-md-none d-inline ms-1'>Add</span>
                        <span className="d-none d-md-inline ms-1">{addButtonText}</span>
                    </button>
                )}
            </div>
        </Container>
    );
};

export default ActionControls;
