import React from 'react'

const Assign_archieves = () => {
  const [assignments, setAssignments] = React.useState([]);
    return (
      <div>
         <div className="table-container  table-responsive">
              <table className="table table-sm r table-striped">
                <thead className=''>
                  <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                    <th className='' style={{ width: '100px' }}>#</th>
                    <th>Title</th>
                    <th>Details</th>
                    <th >Deadline</th>
                    <th>Submission</th>
                    <th>Status</th>
                    <th >Actions</th>
                  </tr>
                </thead>
                <tbody className='heading-14 align-middle greyTextColor'>
                  {
                    assignments && assignments?.length > 0 ? (
                      assignments?.map((item, index) => (
                        <tr className='heading-14' >
                          <td className=' greyText'>{index + 1}</td>
                          <td className=' greyText' >{item.title}</td>
                          <td className=' greyText'> class -{item.classNo} <br />section -{item.sectionName} <br />subject -{item.subjectName}</td>
                          <td className=' greyText' >Start Time - {item.startDate} <br /> End Time - {item.endDate} </td>
                          <td className=' greyText d' >
                            <div className=''>
                              <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${item.currentSubmissions}%` }}></div>
                              </div>
                              {/* <p className='heading-12'>37</p> */}
                            </div>
                          </td>
                          <td className=' greyText' >{item.status}</td>
                          <td className=' greyText' >
                            <td className=' greyText  pe-0' >
                              <div className="dropdown my-button-show">
                                <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Action &nbsp;
                                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                    <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                                  </svg>
                                </button>
                                <ul className="dropdown-menu anchor-color heading-14">
                                  <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" onClick={() => MyAssigmntGetByIdGetAll(item.id)} >Edit</Link></li>
                                  <li><Link className="dropdown-item" to={`/teacher/assigndetails/${item.id}`} onChange={(e) => setIdForDetails(item.id)}>Open</Link></li>
                                  {/* <li><Link className="dropdown-item" to={`/assignmntsubmssion/${item.id}/${item.sectionId}/${item.totalMarks}`}>Submission</Link></li> */}
                                  <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={() => setIdForDelete(item.id)}>Delete</Link></li>
                                </ul>
                              </div>
                            </td>
                          </td>
                        </tr>
                      ))
                    )
                      :
                      (
                        <tr>
                          <td colSpan="12" className="text-center">
                            <div className="d-flex justify-content-center align-items-center m-5 ">
                              <div className="text-center">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" />
                                <h2><b>No Data Found</b></h2>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                  }
  
                </tbody>
                {/* <Toaster /> */}
              </table>
              {/* <div className="d-flex" style={{ marginBottom: '10px' }}>
                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                <div className="ms-auto">
                  <ReactPaginate
                    previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                    nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                    breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                    onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                  />
                </div>
              </div> */}
            </div>
      </div>
    )
}

export default Assign_archieves
