import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { placementService } from '../../../services/placementService';
import type { PlacementRecord } from '../../../types/placement';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

const COLORS = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4'];

export default function PlacementRecordsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pageKey = 'reloaded-' + window.location.pathname.replace(/\//g, '-');
    if (!sessionStorage.getItem(pageKey)) {
      sessionStorage.setItem(pageKey, 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await placementService.getPlacementRecords();
      setRecords(data);
    } catch (error) {
      console.error('Error loading placement records:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = records.map(record => ({
    year: record.academic_year,
    total: record.total_students,
    placed: record.placed_students,
    percentage: ((record.placed_students / record.total_students) * 100).toFixed(1),
    companies: record.companies_visited
  }));

  const packageData = records.map(record => ({
    year: record.academic_year,
    highest: record.highest_package,
    average: record.average_package
  }));

  const latestRecord = records[0];
  const placementPercentage = latestRecord 
    ? ((latestRecord.placed_students / latestRecord.total_students) * 100).toFixed(1)
    : 0;

  const pieData = latestRecord ? [
    { name: 'Placed', value: latestRecord.placed_students },
    { name: 'Not Placed', value: latestRecord.total_students - latestRecord.placed_students }
  ] : [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-teal-600 transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link to="/placement/cell" className="text-gray-600 hover:text-teal-600 transition-colors">Placement Cell</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Placement Records</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Records</h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Year-wise placement statistics and achievements
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading placement records...</p>
          </div>
        ) : records.length === 0 ? (
          <div className="text-center py-20">
            <i className="ri-bar-chart-box-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">No placement records available</p>
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            {latestRecord && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Placement Rate</h3>
                    <i className="ri-percent-line text-2xl text-teal-600"></i>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{placementPercentage}%</p>
                  <p className="text-xs text-gray-500 mt-1">{latestRecord.academic_year}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Students Placed</h3>
                    <i className="ri-user-star-line text-2xl text-emerald-600"></i>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{latestRecord.placed_students}</p>
                  <p className="text-xs text-gray-500 mt-1">out of {latestRecord.total_students} students</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Highest Package</h3>
                    <i className="ri-trophy-line text-2xl text-amber-600"></i>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">₹{latestRecord.highest_package}L</p>
                  <p className="text-xs text-gray-500 mt-1">per annum</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border border-cyan-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">Companies Visited</h3>
                    <i className="ri-building-2-line text-2xl text-cyan-600"></i>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{latestRecord.companies_visited}</p>
                  <p className="text-xs text-gray-500 mt-1">{latestRecord.academic_year}</p>
                </div>
              </div>
            )}

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Placement Trend Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Placement Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="total" fill="#94a3b8" name="Total Students" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="placed" fill="#0d9488" name="Placed Students" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Package Trend Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Package Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={packageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="highest" stroke="#f59e0b" strokeWidth={3} name="Highest Package (LPA)" />
                    <Line type="monotone" dataKey="average" stroke="#0d9488" strokeWidth={3} name="Average Package (LPA)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Latest Year Pie Chart */}
            {latestRecord && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Placement Distribution - {latestRecord.academic_year}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: { name: string, percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Year-wise Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Year-wise Statistics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Academic Year</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Total Students</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Placed</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Percentage</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Highest Package</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Average Package</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Companies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {records.map((record) => {
                      const percentage = ((record.placed_students / record.total_students) * 100).toFixed(1);
                      return (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.academic_year}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.total_students}</td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.placed_students}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                              {percentage}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-center">₹{record.highest_package}L</td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-center">₹{record.average_package}L</td>
                          <td className="px-6 py-4 text-sm text-gray-700 text-center">{record.companies_visited}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
