import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <div className='container-fluid py-4'>
          <div className='row'>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>weekend</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>Total Tasks</p>
                    <h4 className='mb-0'>$53k</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +55%{' '}
                    </span>
                    than lask week
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>person</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>
                      Total Complete Tasks
                    </p>
                    <h4 className='mb-0'>2,300</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +3%{' '}
                    </span>
                    than lask month
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>person</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>Total Users</p>
                    <h4 className='mb-0'>2,300</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +3%{' '}
                    </span>
                    than lask month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-lg-6 col-md-6 mb-md-0 mb-4'>
              <div className='card'>
                <div className='card-header pb-0'>
                  <div className='row'>
                    <div className='col-lg-6 col-7'>
                      <h6>Todo List Table</h6>
                      <p className='text-sm mb-0'>
                        <i
                          className='fa fa-check text-info'
                          aria-hidden='true'
                        ></i>
                        <span className='font-weight-bold ms-1'>30 done</span>{' '}
                        this month
                      </p>
                    </div>
                    <div className='col-lg-6 col-5 my-auto text-end'>
                      <div className='dropdown float-lg-end pe-4'>
                        <a
                          className='cursor-pointer'
                          id='dropdownTable'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                          href='#!'
                        >
                          <i className='fa fa-ellipsis-v text-secondary'></i>
                        </a>
                        <ul
                          className='dropdown-menu px-2 py-3 ms-sm-n4 ms-n5'
                          aria-labelledby='dropdownTable'
                        >
                          <li>
                            <a
                              className='dropdown-item border-radius-md'
                              href='#!'
                            >
                              Action
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item border-radius-md'
                              href='#!'
                            >
                              Another action
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item border-radius-md'
                              href='#!'
                            >
                              Something else here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive'>
                    <table className='table align-items-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Companies
                          </th>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                            Members
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Budget
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Completion
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='d-flex px-2 py-1'>
                              <div></div>
                              <div className='d-flex flex-column justify-content-center'>
                                <h6 className='mb-0 text-sm'>
                                  Material XD Version
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='avatar-group mt-2'>
                              <a
                                href='#!'
                                className='avatar avatar-xs rounded-circle'
                                data-bs-toggle='tooltip'
                                data-bs-placement='bottom'
                                title='Ryan Tompson'
                              ></a>
                              <a
                                href='#!'
                                className='avatar avatar-xs rounded-circle'
                                data-bs-toggle='tooltip'
                                data-bs-placement='bottom'
                                title='Romina Hadid'
                              ></a>
                              <a
                                href='#!'
                                className='avatar avatar-xs rounded-circle'
                                data-bs-toggle='tooltip'
                                data-bs-placement='bottom'
                                title='Alexander Smith'
                              ></a>
                              <a
                                href='#!'
                                className='avatar avatar-xs rounded-circle'
                                data-bs-toggle='tooltip'
                                data-bs-placement='bottom'
                                title='Jessica Doe'
                              ></a>
                            </div>
                          </td>
                          <td className='align-middle text-center text-sm'>
                            <span className='text-xs font-weight-bold'>
                              {' '}
                              $14,000{' '}
                            </span>
                          </td>
                          <td className='align-middle'>
                            <div className='progress-wrapper w-75 mx-auto'>
                              <div className='progress-info'>
                                <div className='progress-percentage'>
                                  <span className='text-xs font-weight-bold'>
                                    60%
                                  </span>
                                </div>
                              </div>
                              <div className='progress'>
                                <div
                                  className='progress-bar bg-gradient-info w-60'
                                  role='progressbar'
                                  aria-valuenow='60'
                                  aria-valuemin='0'
                                  aria-valuemax='100'
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='card h-100'>
                <div className='card-header pb-0'>
                  <h6>Users List</h6>
                  <p className='text-sm'>
                    <i
                      className='fa fa-arrow-up text-success'
                      aria-hidden='true'
                    ></i>
                    <span className='font-weight-bold'>24%</span> this month
                  </p>
                </div>
                <div className='card-body p-3'>
                  <div className='timeline timeline-one-side'>
                    <div className='timeline-block mb-3'>
                      <span className='timeline-step'>
                        <i className='material-icons text-success text-gradient'>
                          notifications
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          $2400, Design changes
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          22 DEC 7:20 PM
                        </p>
                      </div>
                    </div>
                    <div className='timeline-block mb-3'>
                      <span className='timeline-step'>
                        <i className='material-icons text-danger text-gradient'>
                          code
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          New order #1832412
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          21 DEC 11 PM
                        </p>
                      </div>
                    </div>
                    <div className='timeline-block mb-3'>
                      <span className='timeline-step'>
                        <i className='material-icons text-info text-gradient'>
                          shopping_cart
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          Server payments for April
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          21 DEC 9:34 PM
                        </p>
                      </div>
                    </div>
                    <div className='timeline-block mb-3'>
                      <span className='timeline-step'>
                        <i className='material-icons text-warning text-gradient'>
                          credit_card
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          New card added for order #4395133
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          20 DEC 2:20 AM
                        </p>
                      </div>
                    </div>
                    <div className='timeline-block mb-3'>
                      <span className='timeline-step'>
                        <i className='material-icons text-primary text-gradient'>
                          key
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          Unlock packages for development
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          18 DEC 4:54 AM
                        </p>
                      </div>
                    </div>
                    <div className='timeline-block'>
                      <span className='timeline-step'>
                        <i className='material-icons text-dark text-gradient'>
                          payments
                        </i>
                      </span>
                      <div className='timeline-content'>
                        <h6 className='text-dark text-sm font-weight-bold mb-0'>
                          New order #9583120
                        </h6>
                        <p className='text-secondary font-weight-bold text-xs mt-1 mb-0'>
                          17 DEC
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
