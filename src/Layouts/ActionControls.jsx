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
    exportCSVText = 'Export CSV',
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
            if (response?.status === 200 && response?.data?.status === 'success') {
                const { pdfUrl } = response.data;
                if (pdfUrl) {
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = exportPDFFileName; // Use provided filename
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success(response?.data?.message || 'PDF downloaded successfully');
                } else {
                    toast.error('No PDF URL provided in the response');
                }
            } else {
                toast.error(response?.data?.message || 'Failed to fetch PDF');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error downloading PDF');
        }
        finally {
            // setloaderState(false);
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
                    >
                        <i className="bi bi-filetype-pdf"></i>
                        <span className="d-none d-md-inline">{exportPDFText}</span>
                    </button>
                )}

                {/* Export CSV Button */}
                {showExportCSV && (
                    <button
                        className="btn btn-outline-success d-flex align-items-center gap-1"
                        style={{ color: '#198754', borderColor: '#198754', backgroundColor: '#fff' }}
                        onClick={handleExportCSV}
                        title={exportCSVText}
                    >
                        <i className="bi bi-filetype-csv"></i>
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
                                <i className="bi bi-search"></i>
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
                        <span className="d-none d-md-inline ms-1">{secondAddButtonText}</span>
                    </button>
                )}

                {/* First Add Button */}
                {showAddButton && (
                    <button
                        className="btn btn-primary d-flex align-items-center p-2"
                        style={{ backgroundColor: '#008479', borderColor: '#008479' }}
                        onClick={addButtonAction}
                        title={addButtonText}
                    >
                        <span>+</span>
                        <span className="d-none d-md-inline ms-1">{addButtonText}</span>
                    </button>
                )}
            </div>
        </Container>
    );
};

export default ActionControls;
