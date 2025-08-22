import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WorksService } from '../../services/api';
import type { Work } from '../../types';

const AdminWorksPage: React.FC = () => {
  const { token } = useAuth();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newWork, setNewWork] = useState<Partial<Work>>({});
  const [showForm, setShowForm] = useState(false);

  // Fetch works on component mount
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const data = await WorksService.getAllWorks();
      setWorks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching works:', err);
      setError('Не удалось загрузить работы');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setNewWork(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNewWork({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newWork.title || !newWork.imageUrl) {
      setError('Заполните обязательные поля: название и изображение');
      return;
    }

    if (!token) {
      setError('Токен авторизации не найден');
      return;
    }

    try {
      const workData = {
        title: newWork.title!,
        description: newWork.description || '',
        imageUrl: newWork.imageUrl!
      };

      if (editingId) {
        // Update existing work
        await WorksService.updateWork(editingId, workData, token);
      } else {
        // Create new work
        await WorksService.createWork(workData, token);
      }

      // Refresh the works list
      await fetchWorks();
      resetForm();
    } catch (err) {
      console.error('Error saving work:', err);
      setError('Не удалось сохранить работу');
    }
  };

  const handleEdit = (work: Work) => {
    setNewWork({
      title: work.title,
      description: work.description || '',
      imageUrl: work.imageUrl
    });
    setEditingId(work.id);
    setShowForm(true);
  };

  const handleDeleteWork = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту работу?')) {
      return;
    }

    if (!token) {
      setError('Токен авторизации не найден');
      return;
    }

    try {
      await WorksService.deleteWork(id, token);
      setWorks(works.filter(work => work.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting work:', err);
      setError('Не удалось удалить работу');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление работами</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Добавить работу
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      {/* Form for adding/editing works */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Редактировать работу' : 'Добавить новую работу'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название *
              </label>
              <input
                type="text"
                value={newWork.title || ''}
                onChange={(e) => setNewWork(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={newWork.description || ''}
                onChange={(e) => setNewWork(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изображение *
              </label>
              <div className="flex items-center space-x-4">
                {newWork.imageUrl && (
                  <div className="w-32 h-32 bg-gray-100 border rounded-md overflow-hidden">
                    <img 
                      src={newWork.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Или укажите URL изображения:
                  </p>
                  <input
                    type="text"
                    value={newWork.imageUrl || ''}
                    onChange={(e) => setNewWork(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                {editingId ? 'Сохранить' : 'Добавить'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Works table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : works.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">Нет доступных работ</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Изображение
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Описание
                </th>

                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {works.map((work) => (
                <tr key={work.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={work.imageUrl} 
                        alt={work.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{work.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">{work.description}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(work)}
                      className="text-primary hover:text-primary-dark mr-4"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteWork(work.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminWorksPage;