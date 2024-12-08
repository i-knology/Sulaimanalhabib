import { useState } from 'react';
import { Input, Button } from 'antd';
import CancelIcon from './CancelIcon';
import PlusIcon from './plusIcon';
import { useTranslation } from 'react-i18next';

export default function TaskInput({ onTaskChange, onAddTask }) {
    const [tasks, setTasks] = useState([{ id: "1", title: '' }]);
    const { t } = useTranslation()
    const handleTaskChange = (id, value) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, title: value } : task
        );
        setTasks(updatedTasks);
        if (onTaskChange) {
            onTaskChange(updatedTasks);
        }
    };

    const removeTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        if (onTaskChange) {
            onTaskChange(updatedTasks);
        }
    };

    const addNewTask = () => {
        const newTask = {
            id: Math.random().toString(),
            title: ''
        };
        setTasks([...tasks, newTask]);
        if (onAddTask) {
            onAddTask(newTask);
        }
    };

    return (
        <div className="w-full space-y-4" dir="rtl">
            {tasks.map((task) => (
                <div key={task.id} className="relative">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            عنوان المهمة
                        </label>
                    </div>
                    <div className="flex gap-2 relative">
                        <Input
                            variant="filled"
                            value={task.title}
                            onChange={(e) => handleTaskChange(task.id, e.target.value)}
                        />

                        {tasks.length > 1 && (
                            <button

                                onClick={() => removeTask(task.id)}
                                className="text-gray-400 hover:text-gray-600 absolute left-0 top-1/2 translate-1/2"
                                style={{ transform: 'translate(-50%,-50%)' }}
                            >
                                <CancelIcon />
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <div className="flex justify-end items-center space-x-2">
                {/* <Checkbox
          id="addMore"
          checked={addMore}
          onCheckedChange={(checked) => {
            setAddMore(checked);
            if (checked) {
              addNewTask();
            }
          }}
        /> */}
                <button
                    onClick={addNewTask}
                    className='flex gap-[8px]'
                >
                    <PlusIcon />
                    <p style={{
                        color: '#003E69', fontFamily: 'Poppins',
                        fontSize: '16px',
                        textDecorationLine: 'underline',
                        fontWeight: '700'
                    }}>{t("addNewMission")}</p>
                </button>
            </div>
        </div>
    );
};
